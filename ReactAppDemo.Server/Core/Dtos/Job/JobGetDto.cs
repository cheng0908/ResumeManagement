using ReactAppDemo.Server.Core.Entities;
using ReactAppDemo.Server.Core.Enums;

namespace ReactAppDemo.Server.Core.Dtos.Job
{
    public class JobGetDto
    {
        public long ID { get; set; }
        public string Title { get; set; }
        public JobLevel Level { get; set; }
        // Relations
        public long CompanyId { get; set; }
        public string CompanyName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}
