using AutoMapper;
using PixelHeartApi.Dto;
using PixelHeartApi.Models;
namespace PixelHeartApi.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<User,UserDto>();
            CreateMap<UserDto,User>();
            CreateMap<Game,GameDto>();
            CreateMap<GameDto,Game>();
            CreateMap<Skill,SkillDto>();
            CreateMap<SkillDto,Skill>();
            CreateMap<SkillsDto, Skill>();
            CreateMap<Skill, SkillsDto>();
            CreateMap<Match,MatchDto>();
            CreateMap<MatchDto,Match>();
        }
    }
}
