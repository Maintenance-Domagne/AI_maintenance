CREATE DATABASE IF NOT EXISTS maintenance_ai;
USE maintenance_ai;

CREATE TABLE pannes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    machine VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    keywords TEXT NOT NULL,
    solutions TEXT NOT NULL,
    priority INT DEFAULT 1
);
