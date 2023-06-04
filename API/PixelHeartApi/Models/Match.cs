using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PixelHeartApi.Models
{
    public class Match
    {
        [Key]
        public int MatchId { get; set; }
        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [Required]
        public int SexId { get; set; }
        [ForeignKey("SexId")]
        public User Sex { get; set; }

        public bool IsInterested { get; set; }
        public bool AreMatched { get; set; } = false;

        [Required]
        public string MessagesJson { get; set; } = string.Empty;
    }
}
