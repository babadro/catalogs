USE [test]
GO

/****** Object:  StoredProcedure [dbo].[Create_Catalog]    Script Date: 06.08.2018 8:57:24 ******/
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
	@catalog_id INT = NULL, 
	@catalog_name VARCHAR(50)
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
		COMMIT TRANSACTION
		RETURN @cat_id
	END TRY
	BEGIN CATCH
		IF (@@TRANCOUNT > 0)
			ROLLBACK TRAN
	END CATCH
END
GO

