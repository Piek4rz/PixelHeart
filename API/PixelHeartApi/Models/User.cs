using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PixelHeartApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public int Age { get; set; }

        public string Backstory { get; set; } = string.Empty;


        public ICollection<UserSkill> UserSkills { get; set; }

        public ICollection<UserGame> UserGames { get; set; }

        public ICollection<Match> Matches { get; set; }

    }
}
