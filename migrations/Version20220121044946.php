<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220121044946 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE subscription_tag ADD parent_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE subscription_tag ADD CONSTRAINT FK_E7A25968727ACA70 FOREIGN KEY (parent_id) REFERENCES subscription_tag (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_E7A25968727ACA70 ON subscription_tag (parent_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE subscription_tag DROP CONSTRAINT FK_E7A25968727ACA70');
        $this->addSql('DROP INDEX IDX_E7A25968727ACA70');
        $this->addSql('ALTER TABLE subscription_tag DROP parent_id');
    }
}
