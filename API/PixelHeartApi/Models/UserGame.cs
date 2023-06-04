using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PixelHeartApi.Models
{
    public class UserGame
    {
        [Key]
        public int UserGameId { get; set; }
        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [Required]
        public int GameId { get; set; }
        [ForeignKey("GameId")]
        public Game Game { get; set; }
    }
}