// Classe User
using System.ComponentModel.DataAnnotations;

namespace TagSystemAPI.Models;

public class User
{
    public int UserId {get;set;}
    public string RfidTag {get;set;}
    public string Nome {get;set;}
    public string Cargo {get;set;}
    public DateTime HoraCriacao {get;set;}
    
}
