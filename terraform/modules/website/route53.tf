# Создаем DNS записи для валидации
resource "aws_route53_record" "domain_validation" {
  count   = 2
  zone_id = var.route53_zone_id

  name    = tolist(aws_acm_certificate.domain_certificate.domain_validation_options)[count.index].resource_record_name
  type    = tolist(aws_acm_certificate.domain_certificate.domain_validation_options)[count.index].resource_record_type
  ttl     = 60
  records = [tolist(aws_acm_certificate.domain_certificate.domain_validation_options)[count.index].resource_record_value]

  depends_on = [aws_acm_certificate.domain_certificate]
}

resource "aws_route53_record" "website_record" {
  zone_id = var.route53_zone_id
  name    = var.s3_bucket_website
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.website_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "redirect_record" {
  zone_id = var.route53_zone_id
  name    = var.s3_bucket_redirect
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.redirect_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.redirect_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
