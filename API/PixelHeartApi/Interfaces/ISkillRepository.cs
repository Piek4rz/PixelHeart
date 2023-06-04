using PixelHeartApi.Models;

namespace PixelHeartApi.Interfaces
{
    public interface ISkillRepository
    {
        IEnumerable<Skill> GetAll();
        Skill? GetById(int id);
        int Create(Skill skill);
        bool Update(int id, Skill skill);
        bool Delete(int id);
        IEnumerable<User> GetUserBySkillId(int skillId);

    }
}
