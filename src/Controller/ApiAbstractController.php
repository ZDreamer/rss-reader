<?php
namespace App\Controller;

use App\Entity\Feed;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiAbstractController extends AbstractController
{
    public string $apiEntityClass = '';
    protected $apiEntity;

    public function setApiEntity($entity) {
        $this->apiEntity = $entity;
    }
}