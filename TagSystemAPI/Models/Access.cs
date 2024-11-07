using System.ComponentModel.DataAnnotations;

namespace TagSystemAPI.Models;

public class Access
{
    public int UserId { get; set; }
    public int RoomId { get; set; }
    public int AccessId { get; set; }
    public bool IsAuthorized {get;set;}
}
