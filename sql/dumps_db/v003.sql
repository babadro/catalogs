USE [master]
GO
/****** Object:  Database [test]    Script Date: 09.08.2018 9:03:04 ******/
CREATE DATABASE [test]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'test', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\test.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'test_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\test_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [test] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [test].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [test] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [test] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [test] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [test] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [test] SET ARITHABORT OFF 
GO
ALTER DATABASE [test] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [test] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [test] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [test] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [test] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [test] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [test] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [test] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [test] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [test] SET  DISABLE_BROKER 
GO
ALTER DATABASE [test] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [test] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [test] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [test] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [test] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [test] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [test] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [test] SET RECOVERY FULL 
GO
ALTER DATABASE [test] SET  MULTI_USER 
GO
ALTER DATABASE [test] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [test] SET DB_CHAINING OFF 
GO
ALTER DATABASE [test] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [test] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [test] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'test', N'ON'
GO
ALTER DATABASE [test] SET QUERY_STORE = OFF
GO
USE [test]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [test]
GO
/****** Object:  UserDefinedTableType [dbo].[FieldList]    Script Date: 09.08.2018 9:03:04 ******/
CREATE TYPE [dbo].[FieldList] AS TABLE(
	[FieldName] [varchar](50) NULL,
	[FieldType] [tinyint] NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[ValueList]    Script Date: 09.08.2018 9:03:04 ******/
CREATE TYPE [dbo].[ValueList] AS TABLE(
	[ID] [int] NOT NULL,
	[StringVal] [text] NULL,
	[BoolVal] [bit] NULL,
	[IntVal] [int] NULL,
	[DateVal] [date] NULL,
	[FieldId] [int] NOT NULL
)
GO
/****** Object:  Table [dbo].[catalogs]    Script Date: 09.08.2018 9:03:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[catalogs](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[catalog_name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_catalogs] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[field_values]    Script Date: 09.08.2018 9:03:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[field_values](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[string_val] [text] NULL,
	[bool_val] [bit] NULL,
	[int_val] [int] NULL,
	[date_val] [date] NULL,
	[field_id] [int] NOT NULL,
 CONSTRAINT [PK_values] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[fields]    Script Date: 09.08.2018 9:03:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[fields](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[field_name] [varchar](50) NOT NULL,
	[field_type] [tinyint] NOT NULL,
	[catalog_id] [int] NOT NULL,
 CONSTRAINT [PK_fields] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[versions]    Script Date: 09.08.2018 9:03:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[versions](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[catalog_id] [int] NOT NULL,
	[version_name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_versions] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[versions_data]    Script Date: 09.08.2018 9:03:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[versions_data](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[field_id] [int] NOT NULL,
	[field_name] [varchar](50) NOT NULL,
	[string_val] [text] NULL,
	[bool_val] [bit] NULL,
	[int_val] [int] NULL,
	[date_val] [date] NULL,
	[field_type] [tinyint] NOT NULL,
	[version_id] [int] NOT NULL,
 CONSTRAINT [PK_versions_data] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[field_values]  WITH CHECK ADD  CONSTRAINT [FK_values_fields] FOREIGN KEY([field_id])
REFERENCES [dbo].[fields] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[field_values] CHECK CONSTRAINT [FK_values_fields]
GO
ALTER TABLE [dbo].[fields]  WITH CHECK ADD  CONSTRAINT [FK_fields_catalogs] FOREIGN KEY([catalog_id])
REFERENCES [dbo].[catalogs] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[fields] CHECK CONSTRAINT [FK_fields_catalogs]
GO
ALTER TABLE [dbo].[versions]  WITH CHECK ADD  CONSTRAINT [FK_versions_catalogs] FOREIGN KEY([catalog_id])
REFERENCES [dbo].[catalogs] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[versions] CHECK CONSTRAINT [FK_versions_catalogs]
GO
ALTER TABLE [dbo].[versions_data]  WITH CHECK ADD  CONSTRAINT [FK_versions_data_versions] FOREIGN KEY([version_id])
REFERENCES [dbo].[versions] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[versions_data] CHECK CONSTRAINT [FK_versions_data_versions]
GO
/****** Object:  StoredProcedure [dbo].[Create_Catalog]    Script Date: 09.08.2018 9:03:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[Create_Catalog]
	@catalog_name VARCHAR(50),
	@field_list AS dbo.FieldList READONLY
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON
	SET XACT_ABORT ON

	BEGIN TRY
		BEGIN TRANSACTION
		-- Insert statements for procedure here
		INSERT INTO catalogs (catalog_name) VALUES (@catalog_name)
		DECLARE @cat_id INT = SCOPE_IDENTITY()
		INSERT INTO fields (field_name, field_type, catalog_id) SELECT FieldName, FieldType, @cat_id FROM @field_list
		COMMIT TRANSACTION
		RETURN @cat_id
	END TRY
	BEGIN CATCH
		IF (@@TRANCOUNT > 0)
			ROLLBACK TRANSACTION
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[Save_Values]    Script Date: 09.08.2018 9:03:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[Save_Values]
	@value_list AS dbo.ValueList READONLY
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON
	SET XACT_ABORT ON

	BEGIN TRY
		BEGIN TRANSACTION
		-- Insert statements for procedure here
		MERGE dbo.field_values AS t
		USING @value_list AS s
		ON (t.ID = s.ID)

		WHEN MATCHED THEN
			UPDATE SET
				t.string_val = s.StringVal,
				t.bool_val = s.BoolVal,
				t.int_val = s.IntVal,
				t.date_val = s.DateVal,
				t.field_id = s.FieldId
		WHEN NOT MATCHED THEN
			INSERT (string_val, bool_val, int_val, date_val, field_id) VALUES (s.StringVal, s.BoolVal, s.IntVal, s.DateVal,	s.FieldId);
		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		IF (@@TRANCOUNT > 0)
			ROLLBACK TRANSACTION
	END CATCH
END
GO
USE [master]
GO
ALTER DATABASE [test] SET  READ_WRITE 
GO
