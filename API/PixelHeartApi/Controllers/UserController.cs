using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
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
        public readonly IMatchRepository _matchRepository;
        public UserController(IUserRepository userRepository, IMapper mapper, IGameRepository gameRepository, ISkillRepository skillRepository, IMatchRepository matchRepository)
        {
            _userRepository = userRepository;
            _gameRepository = gameRepository;
            _mapper = mapper;
            _skillRepository = skillRepository;
            _matchRepository = matchRepository;
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
                    var userDto = _mapper.Map<UserDto>(user);
                    return Ok(userDto);
                }

                return BadRequest("Nieprawidłowy token.");
            }
            catch (Exception ex)
            {
                return BadRequest("Nieprawidłowy token: " + ex.Message);
            }

        }

        [HttpPost("{userId:int}/Game/{gameId:int}")]
        public IActionResult addGame(int userId, int gameId)
        {
            var user = _userRepository.GetById(userId);
            if (user is null)
            {
                return NotFound();
            }
            var game = _gameRepository.GetById(gameId);
            if (game is null)
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

            var userGame = new UserGame { UserId = userId, GameId = gameId };
            user.UserGames.Add(userGame);
            game.UserGames.Add(userGame);
            _userRepository.SaveChanges();

            return Ok();
        }
        [HttpPost("{userId:int}/Skill/{skillId:int}/{lvl:int}")]
        public IActionResult addSkill(int userId, int skillId, int lvl)
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
            var userSkill = new UserSkill { UserId = userId, SkillId = skillId, Lvl = lvl };
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
            if (user is null)
            {
                return BadRequest("Nie ma takiego użytkownika!");
            }
            var games = _userRepository.GetGameByUserId(userId);
            var gamesDto = _mapper.Map<IEnumerable<GameDto>>(games);
            return Ok(gamesDto);
        }
        [HttpDelete("{userId:int}/game/{gameId:int}")]
        public IActionResult deleteUserGame(int userId, int gameId)
        {
            if (_userRepository.GetById(userId) is null)
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

        //Match related
        [HttpPost("{userId:int}/match/{sexId:int}/{interested:bool}")]
        public IActionResult createMatch(int userId, int sexId, bool interested)
        {
            var user = _userRepository.GetById(userId);
            if (user is null)
            {
                return NotFound();
            }
            var user2 = _userRepository.GetById(sexId);
            if (user2 is null)
            {
                return NotFound();
            }
            if (_matchRepository.isMatchExists(userId, sexId))
            {
                return BadRequest("Relacja juz istnieje!");
            }
            if (user.Matches == null)
            {
                user.Matches = new List<Match>();
            }
            if (user2.Matches == null)
            {
                user2.Matches = new List<Match>();
            }
            var match = new Match { UserId = userId, SexId = sexId, IsInterested = interested };
            user.Matches.Add(match);
            user2.Matches.Add(match);
            _userRepository.SaveChanges();

            if (_matchRepository.setMatched(userId, sexId))
            {
                return Ok("Matched!");
            }
            return Ok("Not yet");
        }
        //w sumie to nie potrzebne xd
        /*[HttpPost("{userId:int}/setMatch/{sexId:int}")]
        public IActionResult setMatched(int userId, int sexId)
        {
            var user = _userRepository.GetById(userId);
            if (user is null)
            {
                return NotFound();
            }
            var user2 = _userRepository.GetById(sexId);
            if (user2 is null)
            {
                return NotFound();
            }
            var isMatched = _matchRepository.setMatched(userId, sexId);
            return Ok(isMatched);
        }*/
        [HttpGet("{userId:int}/match/{sexId:int}")]
        public IActionResult getMatch(int userId, int sexId)
        {
            var user = _userRepository.GetById(userId);
            if (user is null)
            {
                return NotFound();
            }
            var user2 = _userRepository.GetById(sexId);
            if (user2 is null)
            {
                return NotFound();
            }
            var match = _matchRepository.getMatch(userId, sexId);
            if (match is null)
            {
                return NotFound();
            }
            var matchDto = _mapper.Map<MatchDto>(match);
            return Ok(matchDto);
        }
        [HttpGet("{userId:int}/matched")]
        public IActionResult getUserMatched(int userId)
        {
            var user = _userRepository.GetById(userId);
            if (user is null)
            {
                return NotFound();
            }
            var matcheds = _matchRepository.GetAllUserMatched(userId);
            if (matcheds is null)
            {
                return NotFound("Brak egirls :(");
            }
            var userDtos = _mapper.Map<IEnumerable<UserDto>>(matcheds);
            return Ok(userDtos);
        }
        [HttpPut("{userId:int}/matched/{sexId:int}")]
        public IActionResult updateMatch(int userId, int sexId, string message)
        {
            return Ok();
        }
        [HttpDelete("{userId:int}/matched/{sexId:int}")]
        public IActionResult deleteMatch(int userId,int sexId) {
            var user1 = _userRepository.GetById(userId);
            if (user1 is null)
            {
                return NotFound();
            }
            var user2 = _userRepository.GetById(sexId);
            if (user2 is null)
            {
                return NotFound();
            }
            if(_matchRepository.deleteMatch(userId, sexId))
            {
                return Ok("Relacja usunieta");
            }
            return NotFound("Brak relacji");
        }
        [HttpGet("{userId:int}/sex")]
        public IActionResult getSex(int userId)
        {
            var allUsers = _userRepository.GetAll();
            if(_userRepository.GetById(userId) is null)
            {
                return NotFound();
            }
            var userAlreadyGet = _matchRepository.GetAllUserMatched(userId);
            var random = new Random();
            var filteredUsers = allUsers
    .Where(user => user.Id != userId && !userAlreadyGet.Any(match => match.Id == user.Id))
    .ToList();
            var count = 0;
            var check = true;
            if (filteredUsers.Count > 0)
            {
                User randomUser = new User();
                while (check)
                {
                    count++;
                    randomUser = filteredUsers[random.Next(filteredUsers.Count)];
                    if(_matchRepository.isMatchedExists(userId, randomUser.Id))
                    {
                        if (count == 100)
                        {
                            return BadRequest("Brak ludzi na serwisie");
                        }
                        continue;
                    }
                    check = false;


                }
                var userDto = _mapper.Map<UserDto>(randomUser);
                return Ok(userDto);
            }

            return NotFound();
        }
        [HttpPut("{id_1:int}/mmessage/{id_2:int}")]
        public IActionResult updateMessage([FromRoute] int id_1, [FromRoute] int id_2, [FromBody] List<MessageModel> messages)
        {
            if (_userRepository.GetById(id_1) is null)
            {
                return NotFound("User nie istnieje!");
            }
            if (_userRepository.GetById(id_2) is null)
            {
                return NotFound("User nie istnieje!");
            }

            // Convert the messages list to JSON
            string json = JsonConvert.SerializeObject(messages);
            _matchRepository.updateMassage(id_1, id_2, json);
            return Ok("Wyslane!");
        }
        [HttpGet("{id_1:int}/mmessage/{id_2:int}")]
        public IActionResult getMessage(int id_1,int id_2)
        {
            if (_userRepository.GetById(id_1) is null)
            {
                return NotFound("User nie istnieje!");
            }
            if (_userRepository.GetById(id_2) is null)
            {
                return NotFound("User nie istnieje!");
            }
            var message = _matchRepository.getMessage(id_1, id_2); 
            return Ok(message);
        }
    }

}
