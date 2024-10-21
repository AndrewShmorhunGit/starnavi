
resource "aws_route53_record" "starnavi_validation" {
  count   = length(tolist(aws_acm_certificate.starnavi_certificate.domain_validation_options))
  zone_id = var.route53_zone_id

  name    = tolist(aws_acm_certificate.starnavi_certificate.domain_validation_options)[count.index].resource_record_name
  type    = tolist(aws_acm_certificate.starnavi_certificate.domain_validation_options)[count.index].resource_record_type
  ttl     = 60
  records = [tolist(aws_acm_certificate.starnavi_certificate.domain_validation_options)[count.index].resource_record_value]

  depends_on = [aws_acm_certificate.starnavi_certificate]
}

