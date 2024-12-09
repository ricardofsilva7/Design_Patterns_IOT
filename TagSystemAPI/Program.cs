using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TagSystemAPI.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TagSystemContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("TagSystemContext") ?? throw new InvalidOperationException("Connection string 'TagSystemContext' not found.")));

// Adicione o serviço de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();



// Habilite o CORS para a política definida
app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();