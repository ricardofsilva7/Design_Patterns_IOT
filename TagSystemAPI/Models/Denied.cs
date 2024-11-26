using System.ComponentModel.DataAnnotations;

namespace TagSystemAPI.Models;

public class Denied
{
    public int DeniedId {get; set;}
    public string RfidTag {get;set;}
    public DateTime LogTime {get;set;}
}