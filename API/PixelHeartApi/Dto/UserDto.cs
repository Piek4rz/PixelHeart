using System.ComponentModel.DataAnnotations;

namespace PixelHeartApi.Dto
{
    public class UserDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Age { get; set; }

        //do wyjebania :D
        public string Backstory { get; set; } = string.Empty;

       
    }
}
