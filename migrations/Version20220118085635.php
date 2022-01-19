<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220118085635 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE subscription RENAME COLUMN user_id TO owner_id');
        $this->addSql('ALTER TABLE subscription ADD CONSTRAINT FK_A3C664D37E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_A3C664D37E3C61F9 ON subscription (owner_id)');
        $this->addSql('ALTER TABLE subscription_tag RENAME COLUMN user_id TO owner_id');
        $this->addSql('ALTER TABLE subscription_tag ADD CONSTRAINT FK_E7A259687E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_E7A259687E3C61F9 ON subscription_tag (owner_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE subscription DROP CONSTRAINT FK_A3C664D37E3C61F9');
        $this->addSql('DROP INDEX IDX_A3C664D37E3C61F9');
        $this->addSql('ALTER TABLE subscription RENAME COLUMN owner_id TO user_id');
        $this->addSql('ALTER TABLE subscription_tag DROP CONSTRAINT FK_E7A259687E3C61F9');
        $this->addSql('DROP INDEX IDX_E7A259687E3C61F9');
        $this->addSql('ALTER TABLE subscription_tag RENAME COLUMN owner_id TO user_id');
    }
}
