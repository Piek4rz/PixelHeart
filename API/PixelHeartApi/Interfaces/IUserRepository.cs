using PixelHeartApi.Models;

namespace PixelHeartApi.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();
        User? GetById(int id);
        User? GetByEmail(string email);
        int Create(User user);
        bool Update(int id, User user);
        bool Delete(int id);
        IEnumerable<Game> GetGameByUserId(int userId);
        public IEnumerable<Tuple<string, int>> GetSkillByUserId(int userId);
        bool DeleteUserGame(int userId,int gameId);
        void SaveChanges();

        bool gameRelationExists(int userId,int gameId);
        bool skillRelationExists(int userId, int skillId);
    }
}
