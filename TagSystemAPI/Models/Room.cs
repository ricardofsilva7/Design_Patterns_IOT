using System.ComponentModel.DataAnnotations;

namespace TagSystemAPI.Models;

public class Room
{
    public int RoomId {get;set;}
    public string RoomName {get;set;}
    public int Capacity {get;set;}
    public bool IsRestricted {get;set;}
}