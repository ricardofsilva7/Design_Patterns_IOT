using System.ComponentModel.DataAnnotations;

namespace TagSystemAPI.Models;

public class Login
{
    public int LoginId {get;set;}
    public int UserId {get;set;}
    public string Email {get;set;}
    public string Password {get;set;}

}