using System.ComponentModel.DataAnnotations;

namespace TagSystemAPI;

public class LoginDTO
{
    public string Username {get;set;}
    public string Password {get;set;}
}