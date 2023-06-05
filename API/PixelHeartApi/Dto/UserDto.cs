using System.ComponentModel.DataAnnotations;

namespace PixelHeartApi.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Age { get; set; }

        public string Photo { get; set; } = string.Empty;
        //do wyjebania :D
        public string Backstory { get; set; } = string.Empty;

       
    }
}
