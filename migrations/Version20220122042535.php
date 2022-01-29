<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220122042535 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE subscription_subscription_tag DROP CONSTRAINT fk_94e26cec73247b96');
        $this->addSql('ALTER TABLE subscription_tag DROP CONSTRAINT fk_e7a25968727aca70');
        $this->addSql('DROP SEQUENCE subscription_tag_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE folder_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "subscription_folder_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE folder (id INT NOT NULL, owner_id INT NOT NULL, parent_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_ECA209CD7E3C61F9 ON folder (owner_id)');
        $this->addSql('CREATE INDEX IDX_ECA209CD727ACA70 ON folder (parent_id)');
        $this->addSql('CREATE TABLE "subscription_folder" (id INT NOT NULL, subscription_id INT NOT NULL, folder_id INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_2554114A9A1887DC ON "subscription_folder" (subscription_id)');
        $this->addSql('CREATE INDEX IDX_2554114A162CB942 ON "subscription_folder" (folder_id)');
        $this->addSql('ALTER TABLE folder ADD CONSTRAINT FK_ECA209CD7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE folder ADD CONSTRAINT FK_ECA209CD727ACA70 FOREIGN KEY (parent_id) REFERENCES folder (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "subscription_folder" ADD CONSTRAINT FK_2554114A9A1887DC FOREIGN KEY (subscription_id) REFERENCES subscription (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE "subscription_folder" ADD CONSTRAINT FK_2554114A162CB942 FOREIGN KEY (folder_id) REFERENCES folder (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE subscription_subscription_tag');
        $this->addSql('DROP TABLE subscription_tag');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE folder DROP CONSTRAINT FK_ECA209CD727ACA70');
        $this->addSql('ALTER TABLE "subscription_folder" DROP CONSTRAINT FK_2554114A162CB942');
        $this->addSql('DROP SEQUENCE folder_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "subscription_folder_id_seq" CASCADE');
        $this->addSql('CREATE SEQUENCE subscription_tag_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE subscription_subscription_tag (subscription_id INT NOT NULL, subscription_tag_id INT NOT NULL, PRIMARY KEY(subscription_id, subscription_tag_id))');
        $this->addSql('CREATE INDEX idx_94e26cec73247b96 ON subscription_subscription_tag (subscription_tag_id)');
        $this->addSql('CREATE INDEX idx_94e26cec9a1887dc ON subscription_subscription_tag (subscription_id)');
        $this->addSql('CREATE TABLE subscription_tag (id INT NOT NULL, owner_id INT NOT NULL, parent_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_e7a259687e3c61f9 ON subscription_tag (owner_id)');
        $this->addSql('CREATE INDEX idx_e7a25968727aca70 ON subscription_tag (parent_id)');
        $this->addSql('ALTER TABLE subscription_subscription_tag ADD CONSTRAINT fk_94e26cec9a1887dc FOREIGN KEY (subscription_id) REFERENCES subscription (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subscription_subscription_tag ADD CONSTRAINT fk_94e26cec73247b96 FOREIGN KEY (subscription_tag_id) REFERENCES subscription_tag (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subscription_tag ADD CONSTRAINT fk_e7a259687e3c61f9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE subscription_tag ADD CONSTRAINT fk_e7a25968727aca70 FOREIGN KEY (parent_id) REFERENCES subscription_tag (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE folder');
        $this->addSql('DROP TABLE "subscription_folder"');
    }
}
