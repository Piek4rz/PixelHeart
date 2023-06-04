using PixelHeartApi.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PixelHeartApi.Dto
{
    public class MatchDto
    {
        public int MatchId { get; set; }
        public int UserId { get; set; }
        public int SexId { get; set; }
        public bool IsInterested { get; set; }
        public bool AreMatched { get; set; }
        public string MessagesJson { get; set; } = string.Empty;
    }
}
