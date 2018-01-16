using WebApplication4.Models;
using Microsoft.EntityFrameworkCore;


namespace WebApplication4.Daten
{
    public class LolocoContext : DbContext
    {
        public LolocoContext(DbContextOptions<LolocoContext> options) : base(options)
        {
        }
        



        public DbSet<Consumer> Consumers { get; set; }

        public DbSet<User> Users{ get; set; }

        public DbSet<Coupon> Coupon { get; set; }
        public DbSet<Action> Action { get; set; }






        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Consumer>().ToTable("Consumer");
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Coupon>().ToTable("Coupon");
            modelBuilder.Entity<Action>().ToTable("Action");



        }

    }
}
