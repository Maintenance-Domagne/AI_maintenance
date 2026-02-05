IF DB_ID('maintenance_ai') IS NULL
BEGIN
    CREATE DATABASE maintenance_ai;
END
GO

USE maintenance_ai;
GO

CREATE TABLE pannes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    machine VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    keywords NVARCHAR(MAX) NOT NULL,  -- mots-clés séparés par des virgules
    solutions NVARCHAR(MAX) NOT NULL, -- solutions séparées par "|"
    priority INT DEFAULT 1
);
GO
