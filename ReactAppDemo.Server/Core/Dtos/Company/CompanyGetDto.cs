using ReactAppDemo.Server.Core.Entities;
using ReactAppDemo.Server.Core.Enums;

namespace ReactAppDemo.Server.Core.Dtos.Company
{
    public class CompanyGetDto
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public CompanySize Size { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
