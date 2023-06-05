using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PixelHeartApi.Dto;
using PixelHeartApi.Interfaces;
using PixelHeartApi.Models;
using PixelHeartApi.Repositories;

namespace PixelHeartApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        public readonly IUserRepository _userRepository;
        public readonly IMapper _mapper;
        public readonly ISkillRepository _skillRepository;
        public SkillController(IUserRepository userRepository, IMapper mapper, ISkillRepository skillRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _skillRepository = skillRepository;
        }
        [HttpGet]
        public IActionResult GetAllSkills()
        {
            var skills = _skillRepository.GetAll();
            if (skills is null)
            {
                return NotFound();
            }
            var skillsDtos = _mapper.Map<IEnumerable<SkillsDto>>(skills);
            //tutaj zmapowac do dto
            return Ok(skillsDtos);
        }
        [HttpGet("{id:int}")]
        public IActionResult GetSkill(int id)
        {
            var skill = _skillRepository.GetById(id);
            if (skill is null)
            {
                return NotFound();
            }
            var skillDto = _mapper.Map<SkillDto>(skill);
            return Ok(skillDto);
        }
        [HttpGet("{id:int}/user")]
        public IActionResult GetUserBySkill(int id)
        {
            if (_skillRepository.GetById(id) is null)
            {
                return NotFound(id);
            }
            var users = _skillRepository.GetUserBySkillId(id);
            var userDtos = _mapper.Map<IEnumerable<UserDto>>(users);
            return Ok(userDtos);
        }
        [HttpPost]
        public IActionResult CreateSkill([FromBody] SkillDto skillDto)
        {
            var skill = _mapper.Map<Skill>(skillDto);
            var id = _skillRepository.Create(skill);
            return Ok(id);
        }
        [HttpPut("{id:int}")]
        public IActionResult UpdateSkill([FromRoute] int id, [FromBody] Skill skill)
        {
            var isSuccess = _skillRepository.Update(id, skill);
            if (!isSuccess)
            {
                return NotFound(id);
            }
            return Ok();
        }
        [HttpDelete("{id:int}")]
        public IActionResult DeleteSkill([FromRoute] int id)
        {
            var isSuccess = _skillRepository.Delete(id);
            if (!isSuccess)
            {
                return NotFound();
            }
            return NoContent();
        }


    }
}
