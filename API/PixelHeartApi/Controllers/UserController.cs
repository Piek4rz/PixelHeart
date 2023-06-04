using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PixelHeartApi.Dto;
using PixelHeartApi.Interfaces;
using PixelHeartApi.Models;
using PixelHeartApi.Repositories;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PixelHeartApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUserRepository _userRepository;
        public readonly IMapper _mapper;
        public readonly IGameRepository _gameRepository;
        public readonly ISkillRepository _skillRepository;
        public UserController(IUserRepository userRepository, IMapper mapper, IGameRepository gameRepository, ISkillRepository skillRepository)
        {
            _userRepository = userRepository;
            _gameRepository = gameRepository;
            _mapper = mapper;
            _skillRepository = skillRepository;
        }
        [HttpGet("{id:int}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userRepository.GetById(id);
            if (user is null)
            {
                return BadRequest("Uzytkowik o takim id nie istnieje!");
            }
            return Ok(user);
        }
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userRepository.GetAll();
            if (users is null)
            {
                return BadRequest("Baza danych jest pusta!");
            }
            return Ok(users);
        }
        [HttpGet("{email}")]
        public IActionResult GetUserByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);
            if (user is null)
            {
                return BadRequest("Uzytkowik o takim emailu nie istnieje!");
            }
            return Ok(user);
        }
        [HttpPost]
        public IActionResult CreateUser([FromBody] UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            var id = _userRepository.Create(user);
            return Created("/api/user/{id}", user);
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateGame([FromRoute] int id, [FromBody] UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            var isSuccess = _userRepository.Update(id, user);
            if (!isSuccess)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public IActionResult DeleteUser(int id) 
        {
            var isSuccess = _userRepository.Delete(id);
            if (!isSuccess)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpGet("/token/{token}")]
        public IActionResult GetUserByToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("your-256-bit-secret");

            // Konfiguruj opcje weryfikacji tokena
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false
            };

            try
            {
                // Odkoduj token
                var claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out _);

                // Pobierz identyfikator użytkownika z tokena
                var emailClaim = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
                if (emailClaim != null)
                {
                    var userEmail = emailClaim.Value;
                    var user = _userRepository.GetByEmail(userEmail);
                    if (user is null)
                    {
                        return BadRequest(userEmail);
                    }

                    return Ok(user);
                }

                return BadRequest("Nieprawidłowy token.");
            }
            catch (Exception ex)
            {
                return BadRequest("Nieprawidłowy token: " + ex.Message);
            }
            
        }

        [HttpPost("{userId:int}/Game/{gameId:int}")]
        public IActionResult addGame(int userId,int gameId) 
        {
            var user = _userRepository.GetById(userId);
            if (user is null)
            {
                return NotFound();
            }
            var game = _gameRepository.GetById(gameId);
            if(game is null)
            {
                return NotFound();
            }
            if (_userRepository.gameRelationExists(userId, gameId))
            {
                return BadRequest("Relacja juz istnieje!");
            }
            if (user.UserGames == null)
            {
                user.UserGames = new List<UserGame>();
            }
            if (game.UserGames == null)
            {
                game.UserGames = new List<UserGame>();
            }
            
            var userGame = new UserGame { UserId=userId, GameId=gameId };
            user.UserGames.Add(userGame);
            game.UserGames.Add(userGame);
            _userRepository.SaveChanges();
                        
            return Ok();
        }
        [HttpPost("{userId:int}/Skill/{skillId:int}")]
        public IActionResult addSkill(int userId, int skillId,int lvl)
        {
            var user = _userRepository.GetById(userId);
            if (user is null)
            {
                return NotFound();
            }
            var skill = _skillRepository.GetById(skillId);
            if (skill is null)
            {
                return NotFound();
            }
            if (_userRepository.skillRelationExists(userId, skillId))
            {
                return BadRequest("Relacja juz istnieje!");
            }
            if (user.UserSkills == null)
            {
                user.UserSkills = new List<UserSkill>();
            }
            if (skill.UserSkills == null)
            {
                skill.UserSkills = new List<UserSkill>();
            }
            var userSkill = new UserSkill { UserId = userId, SkillId = skillId, Lvl=lvl};
            user.UserSkills.Add(userSkill);
            skill.UserSkills.Add(userSkill);
            _userRepository.SaveChanges();
            return Ok();
        }
        [HttpGet("{userId:int}/skill")]
        public IActionResult getUserSkill(int userId)
        {
            var user = _userRepository.GetById(userId);
            if (user is null)
            {
                return NotFound(userId);
            }
            var skills = _userRepository.GetSkillByUserId(userId);
            return Ok(skills);
        }
        [HttpGet("{userId:int}/game")]
        public IActionResult getUserGames(int userId)
        {
            var user = _userRepository.GetById(userId);
            if(user is null)
            {
                return BadRequest("Nie ma takiego użytkownika!");
            }
            var games = _userRepository.GetGameByUserId(userId);

            return Ok(games);
        }
        [HttpDelete("{userId:int}/game/{gameId:int}")]
        public IActionResult deleteUserGame(int userId,int gameId)
        {
            if(_userRepository.GetById(userId) is null)
            {
                return BadRequest("Nie ma takiego usera!");
            }
            if (_gameRepository.GetById(gameId) is null)
            {
                return BadRequest("Nie ma takiej gry!");
            }

            _userRepository.DeleteUserGame(userId, gameId);
            return Ok();
        }
        
    }
}
