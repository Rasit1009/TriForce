using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace WebApplication4.Migrations
{
    public partial class j22 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PLZ",
                table: "User",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "Coupondetail",
                table: "CouponSystem",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Moneyvalue",
                table: "CouponSystem",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Coupondetail",
                table: "CouponSystem");

            migrationBuilder.DropColumn(
                name: "Moneyvalue",
                table: "CouponSystem");

            migrationBuilder.AlterColumn<int>(
                name: "PLZ",
                table: "User",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
