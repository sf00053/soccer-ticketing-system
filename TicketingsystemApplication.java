package com.soccer.ticketingsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import java.time.LocalDateTime;

// Assuming these are the proper package paths for your model classes
import com.soccer.ticketingsystem.model.Users;
import com.soccer.ticketingsystem.model.Game;
import com.soccer.ticketingsystem.model.Game.GameType;
import com.soccer.ticketingsystem.model.Users.UserRole;
import com.soccer.ticketingsystem.database.*;

@SpringBootApplication
public class TicketingsystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(TicketingsystemApplication.class, args);
    }
    
    @Bean
    public CommandLineRunner loadData() {
        return (args) -> {
            InMemoryDatabase db = InMemoryDatabase.getInstance();

            // Clear old data
            db.clearAllData();

            // Create users
            Users student = new Users();
            student.setUsername("sf00053");
            student.setEmail("sf00053@mix.wvu.edu");
            student.setPassword("Injured25#");
            student.setRole(UserRole.STUDENT);
            student.register();

            Users student2 = new Users();
            student2.setUsername("mal00036");
            student2.setEmail("mal00036@mix.wvu.edu");
            student2.setPassword("CSMajorGrad27%");
            student2.setRole(UserRole.STUDENT);
            student2.register();

            Users faculty = new Users();
            faculty.setUsername("faculty");
            faculty.setEmail("faculty@mail.wvu.edu");
            faculty.setPassword("password");
            faculty.setRole(UserRole.FACULTY);
            faculty.register();

            Users family = new Users();
            family.setUsername("family");
            family.setEmail("family@gmail.com");
            family.setPassword("password");
            family.setRole(UserRole.FAMILY);
            family.register();

            Users regular = new Users();
            regular.setUsername("regular");
            regular.setEmail("regular@gmail.com");
            regular.setPassword("password");
            regular.setRole(UserRole.REGULAR);
            regular.register();

            // Create games
            Game homeGame1 = new Game();
            homeGame1.setGameName("WVU Tech Women Soccer vs Kokomo University Women Soccer");
            homeGame1.setGameDate(LocalDateTime.now().plusDays(7));
            homeGame1.setStadiumName("YMCA Complex");
            homeGame1.setGameType(GameType.OUTDOOR);
            homeGame1.setIsHomeGame(true);
            homeGame1.setTotalSeats(100);
            int homeGame1Id = homeGame1.addGame();

            Game homeGame2 = new Game();
            homeGame2.setGameName("WVU Tech Women Soccer vs Bluefield State Women Soccer");
            homeGame2.setGameDate(LocalDateTime.now().plusDays(14));
            homeGame2.setStadiumName("YMCA Complex");
            homeGame2.setGameType(GameType.OUTDOOR);
            homeGame2.setIsHomeGame(true);
            homeGame2.setTotalSeats(100);
            int homeGame2Id = homeGame2.addGame();

            Game awayGame = new Game();
            awayGame.setGameName("IU East Women Soccer vs WVU Tech Women Soccer");
            awayGame.setGameDate(LocalDateTime.now().plusDays(21));
            awayGame.setStadiumName("IU East Stadium");
            awayGame.setGameType(GameType.OUTDOOR);
            awayGame.setIsHomeGame(false);
            awayGame.setTotalSeats(80);
            int awayGameId = awayGame.addGame();

            Game indoorGame = new Game();
            indoorGame.setGameName("Shaw University Women Soccer vs WVU Tech Women Soccer");
            indoorGame.setGameDate(LocalDateTime.now().plusDays(28));
            indoorGame.setStadiumName("Shaw University Stadium");
            indoorGame.setGameType(GameType.OUTDOOR);
            indoorGame.setIsHomeGame(false);
            indoorGame.setTotalSeats(50);
            int indoorGameId = indoorGame.addGame();

            // Create seats for games
            db.createSeatsForGame(homeGame1Id, 3, 10, 20.0);
            db.createSeatsForGame(homeGame2Id, 3, 10, 25.0);
            db.createSeatsForGame(awayGameId, 2, 10, 30.0);
            db.createSeatsForGame(indoorGameId, 2, 5, 35.0);
        };
    }
}
