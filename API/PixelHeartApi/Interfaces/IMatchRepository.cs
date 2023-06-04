﻿using PixelHeartApi.Models;

namespace PixelHeartApi.Interfaces
{
    public interface IMatchRepository
    {
        IEnumerable<User> GetAllUserMatches(int id_1);
        bool setMatched(int id_1, int id_2);
        bool areMatched(int id_1, int id_2);
        int createMatch(int id_1, int id_2, bool interested);
        Match getMatch(int id_1, int id_2);
        int deleteMatch(int id_1, int id_2);
        IEnumerable<User> GetAllUserMatched(int id_1);
    }
}
