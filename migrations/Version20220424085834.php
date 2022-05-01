<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220424085834 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE feed_source_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE feed_source (id INT NOT NULL, url TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, state VARCHAR(32) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN feed_source.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN feed_source.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE feed ADD source_id INT NOT NULL');
        $this->addSql('ALTER TABLE feed ADD state VARCHAR(32) NOT NULL');
        $this->addSql('ALTER TABLE feed ADD CONSTRAINT FK_234044AB953C1C61 FOREIGN KEY (source_id) REFERENCES feed_source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_234044AB953C1C61 ON feed (source_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE feed DROP CONSTRAINT FK_234044AB953C1C61');
        $this->addSql('DROP SEQUENCE feed_source_id_seq CASCADE');
        $this->addSql('DROP TABLE feed_source');
        $this->addSql('DROP INDEX IDX_234044AB953C1C61');
        $this->addSql('ALTER TABLE feed DROP source_id');
        $this->addSql('ALTER TABLE feed DROP state');
    }
}
