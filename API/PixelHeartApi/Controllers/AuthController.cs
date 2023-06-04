using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PixelHeartApi.Dto;
using PixelHeartApi.Interfaces;
using PixelHeartApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

//dokonczyc
namespace PixelHeartApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IUserRepository _userRepository;
        public readonly IMapper _mapper;
        public readonly IConfiguration _config;
        public AuthController(IUserRepository userRepository, IMapper mapper, IConfiguration config)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _config = config;
        }
        [HttpPost("register")]
        public IActionResult Register(UserDto user)
        {
            var newUser = _mapper.Map<User>(user);
            if(_userRepository.GetByEmail(newUser.Email) != null) 
            {
                return BadRequest("Uzytkownik o tak emailu juz istnieje!");
            }

            _userRepository.Create(newUser);
            string token = CreateToken(newUser.Email);

            return Ok(token);
        }
        [HttpPost("login")]
        public IActionResult Login(LoginDto user)
        {
            User checkUser = _userRepository.GetByEmail(user.Email);
            if (checkUser is null)
            {
                return BadRequest("Uzytkownik o tak emailu nie istnieje!");
            }
            if(checkUser.Password != user.Password)
            {
                return BadRequest("Podano bledne hasło!");
            }

            string token = CreateToken(user.Email);

            return Ok(token);
        }
        //generowanie tokena
        private string CreateToken(string email)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-256-bit-secret"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.MaxValue, // Token bez wygaśnięcia
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }



    }
}
