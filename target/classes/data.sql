-- to insert only if table is empty
--  INSERT INTO role (name) SELECT 'ROLE_ADMIN' WHERE NOT EXISTS (SELECT * FROM role WHERE role.name='ROLE_ADMIN');
--  INSERT INTO role (name) SELECT 'ROLE_USER' WHERE NOT EXISTS (SELECT * FROM role WHERE role.name='ROLE_USER');

SELECT 1
-- FROM role;
-- INSERT INTO role (name) VALUES ('ROLE_ADMIN');
-- INSERT INTO role (name) VALUES ('ROLE_USER');
