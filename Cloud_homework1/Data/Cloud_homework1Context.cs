using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Cloud_homework1.Models
{
    public class Cloud_homework1Context : DbContext
    {
        public Cloud_homework1Context (DbContextOptions<Cloud_homework1Context> options)
            : base(options)
        {
        }

        public DbSet<Cloud_homework1.Models.Movie> Movie { get; set; }
    }
}
