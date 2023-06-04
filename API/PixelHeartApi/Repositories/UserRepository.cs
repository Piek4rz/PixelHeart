using Microsoft.EntityFrameworkCore;
using PixelHeartApi.Data;
using PixelHeartApi.Interfaces;
using PixelHeartApi.Models;

namespace PixelHeartApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private DatabaseContext context;


        public UserRepository(DatabaseContext context) { this.context = context; }

        public int Create(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
            return user.Id;
        }

        public bool Delete(int id)
        {
            var userToDelete = context.Users.Find(id);
            if (userToDelete is null)
            { return false; }
            context.Users.Remove(userToDelete);
            context.SaveChanges();
            return true;
        }

        public IEnumerable<User> GetAll()
        {
            return context.Users.ToList();
        }

        public User? GetByEmail(string email)
        {
            var user = context.Users.FirstOrDefault(u => u.Email == email);
            return user;
        }

        public User? GetById(int id)
        {
            return context.Users.FirstOrDefault(user => user.Id == id);
        }

        public bool Update(int id, User user)
        {
            var userToUpdate = context.Users.Find(id);
            if (userToUpdate is null)
            {
                return false;
            }
            userToUpdate.Name = user.Name;
            userToUpdate.Password = user.Password;
            userToUpdate.Age = user.Age;
            userToUpdate.Email = user.Email;
            userToUpdate.Backstory = user.Backstory;

            context.SaveChanges();

            return true;
        }

        public IEnumerable<Game> GetGameByUserId(int userId)
        {
            var games = context.UserGames.Where(e => e.UserId == userId).Include(p => p.Game).ToList();
            return games.Select(g => g.Game);
        }

        public bool DeleteUserGame(int userId, int gameId)
        {
            var userGame = context.UserGames.FirstOrDefault(ug => ug.UserId == userId && ug.GameId == gameId);
            if (userGame == null)
            {
                return false;
            }

            context.UserGames.Remove(userGame);
            context.SaveChanges();
            return true;
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }

        public bool gameRelationExists(int userId, int gameId)
        {
            var userGame = context.UserGames.FirstOrDefault(ug => ug.UserId == userId && ug.GameId == gameId);
            if (userGame == null)
            {
                return false;
            }
            return true;
        }
        public bool skillRelationExists(int userId, int skillId)
        {
            var userSkill = context.UserSkills.FirstOrDefault(ug => ug.UserId == userId && ug.SkillId == skillId);
            if (userSkill == null)
            {
                return false;
            }
            return true;
        }

        public IEnumerable<Tuple<string, int>> GetSkillByUserId(int userId)
        {
            var userSkills = context.UserSkills
                .Where(e => e.UserId == userId)
                .Include(e => e.Skill)
                .ToList();

            return userSkills.Select(e => new Tuple<string, int>(e.Skill.Name, e.Lvl));
        }
    }
}
