using Microsoft.AspNetCore.Mvc;
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

        public int createMatch(int id_1, int id_2,bool interested)
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

        public int deleteMatch(int id_1, int id_2)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetAllUserMatches(int id_1)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<User> GetAllUserMatched(int id_1)
        {
            throw new NotImplementedException();
        }

        public Match getMatch(int id_1, int id_2)
        {
            throw new NotImplementedException();
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


    }
}
