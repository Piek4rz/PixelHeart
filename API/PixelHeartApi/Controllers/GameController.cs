using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PixelHeartApi.Interfaces;
using PixelHeartApi.Models;
using PixelHeartApi.Dto;

namespace PixelHeartApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        public readonly IGameRepository _gameRepository;
        public readonly IUserRepository _userRepository;
        public readonly IMapper _mapper;
        public GamesController(IGameRepository gameRepository, IMapper mapper, IUserRepository userRepository)
        {
            _gameRepository = gameRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }
        [HttpGet]
        public IActionResult GetAllGames()
        {
            var games = _gameRepository.GetAll();
            var gamesDto = _mapper.Map<IEnumerable<GameDto>>(games);
            return Ok(gamesDto);
        }
        [HttpGet("{id:int}")]
        public IActionResult GetGamesById(int id)
        {
            var game = _gameRepository.GetById(id);
            if (game is null)
            {
                return NotFound();
            }
            return Ok(game);
        }
        [HttpPost]
        public IActionResult CreateGame([FromBody]GameDto gameCreate)
        {
            var game = _mapper.Map<Game>(gameCreate);
            
            var id = _gameRepository.Create(game);
            return Created("/api/game/{id}", game);
        }
        [HttpPut("{id:int}")]
        public IActionResult UpdateGame([FromRoute] int id, [FromBody] Game game)
        {
            var isSuccess = _gameRepository.Update(id, game);
            if (!isSuccess)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public IActionResult DeleteGame(int id)
        {
            var isSuccess = _gameRepository.Delete(id);
            if (!isSuccess)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpGet("{gameId:int}/user")]
        public IActionResult GetUserByGameId(int gameId)
        {
            if(_gameRepository.GetById(gameId) is null)
            {
                return BadRequest("Podana gra nie istnieje!");
            }
            var users = _gameRepository.GetUserByGameId(gameId);
            var userDtos = _mapper.Map<IEnumerable<UserDto>>(users);
            return Ok(userDtos);
        }
        
    }
}
