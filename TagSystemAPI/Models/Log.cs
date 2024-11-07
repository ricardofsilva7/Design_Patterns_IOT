// Classe Log
using System.ComponentModel.DataAnnotations;

namespace TagSystemAPI.Models;

public class Log
{
    [Key]
    public string RfidTag {get;set;}
    public DateTime LogTime {get;set;}
    
}