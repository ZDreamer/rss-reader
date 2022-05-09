<?php
namespace App\Service;

class UrlProcessor
{
    public function toFullUrl($url): string {
        if (!parse_url($url, PHP_URL_SCHEME)) {
            $url = 'https://' . $url;
        }

        if (filter_var($url, FILTER_VALIDATE_URL) === false) {
            throw new \Exception('Invalid url');
        }

        return $url;
    }

    public function toUrlTitle($url): string {
        $parts = parse_url($url);

        $url = '';

        if (!empty($parts['host'])) {
            $url .= $parts['host'];
        }

        if (!empty($parts['path'])) {
            $url .= $parts['path'];
        }

        if (!empty($parts['query'])) {
            if (is_array($parts['query'])) {
                $url .= '?' . http_build_query($parts['query']);
            } else {
                $url .= '?' . $parts['query'];
            }
        }

        return $url;
    }
}