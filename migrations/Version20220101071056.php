<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220101071056 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE subscription_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE subscription_tag_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE subscription (id INT NOT NULL, user_id INT NOT NULL, title VARCHAR(1024) NOT NULL, url TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE subscription_subscription_tag (subscription_id INT NOT NULL, subscription_tag_id INT NOT NULL, PRIMARY KEY(subscription_id, subscription_tag_id))');
        $this->addSql('CREATE INDEX IDX_94E26CEC9A1887DC ON subscription_subscription_tag (subscription_id)');
        $this->addSql('CREATE INDEX IDX_94E26CEC73247B96 ON subscription_subscription_tag (subscription_tag_id)');
        $this->addSql('CREATE TABLE subscription_tag (id INT NOT NULL, title VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE subscription_subscription_tag ADD CONSTRAINT FK_94E26CEC9A1887DC FOREIGN KEY (subscription_id) REFERENCES subscription (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subscription_subscription_tag ADD CONSTRAINT FK_94E26CEC73247B96 FOREIGN KEY (subscription_tag_id) REFERENCES subscription_tag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE subscription_subscription_tag DROP CONSTRAINT FK_94E26CEC9A1887DC');
        $this->addSql('ALTER TABLE subscription_subscription_tag DROP CONSTRAINT FK_94E26CEC73247B96');
        $this->addSql('DROP SEQUENCE subscription_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE subscription_tag_id_seq CASCADE');
        $this->addSql('DROP TABLE subscription');
        $this->addSql('DROP TABLE subscription_subscription_tag');
        $this->addSql('DROP TABLE subscription_tag');
    }
}
