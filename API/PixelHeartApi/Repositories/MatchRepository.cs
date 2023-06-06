using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PixelHeartApi.Data;
using PixelHeartApi.Interfaces;
using PixelHeartApi.Models;
using System.Runtime.Intrinsics.X86;

namespace PixelHeartApi.Repositories
{
    public class MatchRepository : IMatchRepository
    {
        private DatabaseContext context;
        public MatchRepository(DatabaseContext context)
        {
            this.context = context;
        }

        public bool areMatched(int id_1, int id_2)
        {
            var match1 = context.Matches.FirstOrDefault(m => m.UserId == id_1 && m.SexId == id_2 && m.IsInterested);
            var match2 = context.Matches.FirstOrDefault(m => m.UserId == id_2 && m.SexId == id_1 && m.IsInterested);

            bool isMatched = match1 != null && match2 != null;

            return isMatched;
        }

        //w sumie nie uzywam
        public int createMatch(int id_1, int id_2,bool interested)
        {
            var match = context.Matches.FirstOrDefault(e => e.UserId == id_1 && e.SexId == id_2);
            if(match is null)
            {
                Match newMatch = new Match
                {
                    UserId = id_1,
                    SexId = id_2,
                    IsInterested = interested
                };

                context.Matches.Add(newMatch);
                context.SaveChanges();

                return newMatch.MatchId;
            }
            return 0;
           
        }

        public bool deleteMatch(int id_1, int id_2)
        {
            var match1 = context.Matches.FirstOrDefault(e => e.UserId == id_1 && e.SexId == id_2);
            var match2 = context.Matches.FirstOrDefault(e => e.UserId == id_2 && e.SexId == id_1);
            if (match1 is null)
            {
                return false;
            }
            if (match2 is null)
            {
                return false;
            }

            context.Matches.Remove(match1);
            context.Matches.Remove(match2);
            context.SaveChanges();
            return true;
            
        }

        public IEnumerable<User> GetAllUserMatches(int id_1)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<User> GetAllUserMatched(int id_1)
        {
            var users = context.Matches.Where(e => e.UserId == id_1 && e.AreMatched == true).Include(p => p.Sex).ToList();
            return users.Select(e => e.Sex);
        }

        public Match getMatch(int id_1, int id_2)
        {
            var match1 = context.Matches.FirstOrDefault(m => m.UserId == id_1 && m.SexId == id_2 && m.IsInterested);
            return match1;
        }

        public bool setMatched(int id_1, int id_2)
        {
            if(!areMatched(id_1,id_2))
            {
                return false;
            }
            var match1 = context.Matches.FirstOrDefault(m => m.UserId == id_1 && m.SexId == id_2 && m.IsInterested);
            var match2 = context.Matches.FirstOrDefault(m => m.UserId == id_2 && m.SexId == id_1 && m.IsInterested);

            if (match1 != null && match2 != null)
            {
                match1.AreMatched = true;
                match2.AreMatched = true;
                context.SaveChanges();
                return true;
            }

            return false;
        }
        public bool isMatchExists(int id_1, int id_2)
        {
            var match = context.Matches.FirstOrDefault(e => e.UserId == id_1 && e.SexId == id_2);
            if(match is null)
                return false;
            return true;
        }
        public bool isMatchedExists(int id_1, int id_2)
        {
            var match = context.Matches.FirstOrDefault(e => e.UserId == id_1 && e.SexId == id_2 && e.AreMatched==true);
            if (match is null)
                return false;
            return true;
        }

        public bool updateMassage(int id_1, int id_2, string message)
        {
            var match1 = context.Matches.FirstOrDefault(m => m.UserId == id_1 && m.SexId == id_2);
            var match2 = context.Matches.FirstOrDefault(m => m.UserId == id_2 && m.SexId == id_1);
            if(match1 is null)
                return false;
            if(match2 is null) return false;
            match1.MessagesJson = message;
            match2.MessagesJson = message;
            context.SaveChanges();
            return true;
        }

        public string getMessage(int id_1, int id_2)
        {
            var match = context.Matches.FirstOrDefault(m => m.UserId == id_1 && m.SexId == id_2);
            if (match is null)
                return "Bląd";
            return match.MessagesJson;
        }
    }
}
