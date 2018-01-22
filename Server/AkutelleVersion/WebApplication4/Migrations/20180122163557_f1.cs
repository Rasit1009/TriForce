using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WebApplication4.Migrations
{
    public partial class f1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.AddColumn<int>(
                name: "AllPoints",
                table: "User",
                nullable: false,
                defaultValue: 0);

            
               
              
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.DropColumn(
                name: "AllPoints",
                table: "User");

            
         
        }
    }
}
