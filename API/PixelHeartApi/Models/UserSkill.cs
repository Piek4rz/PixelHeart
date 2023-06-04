using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PixelHeartApi.Models
{
    public class UserSkill
    {
        [Key]
        public int UserSkillId { get; set; }
        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [Required]
        public int SkillId { get; set; }
        [ForeignKey("SkillId")]
        public Skill Skill { get; set; }

        [Required]
        public int Lvl { get; set; }
    }
}