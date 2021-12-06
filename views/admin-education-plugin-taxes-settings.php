<?php
/**
 * Admin: Plugin tax settings education
 *
 * @package SimplePay
 * @subpackage Core
 * @copyright Copyright (c) 2021, WP Simple Pay, LLC
 * @license http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since 4.4.0
 *
 * @var string $upgrade_url The upgrade URL.
 * @var string $upgrade_text The upgrade button text.
 * @var string $upgrade_subtext The upgrade button subtext.
 */

?>

<div class="simpay-landing-zone">

	<h2 class="simpay-landing-zone__title">
		<?php echo esc_html_e( '💸 Collect Taxes and Additional Fees', 'simple-pay' ); ?>
	</h2>

	<p class="simpay-landing-zone__subtitle">
		<?php
		esc_html_e(
			'Add tax rates to your payment forms or charge an additional amount to help cover processing fees with WP Simple Pay Pro.',
			'simple-pay'
		);
		?>
	</p>

	<section class="simpay-landing-zone__screenshot">
		<div class="simpay-landing-zone__screenshot-img">
			<img src="<?php echo esc_url( SIMPLE_PAY_INC_URL . 'core/assets/images/settings/taxes-thumb.png' ); // @phpstan-ignore-line ?>" alt="<?php echo esc_attr( 'Tax settings', 'simple-pay' ); ?>" />
			<a href="<?php echo esc_url( SIMPLE_PAY_INC_URL . 'core/assets/images/settings/taxes-full.png' ); // @phpstan-ignore-line ?>" class="hover" data-lity></a>
		</div>

		<ul>
			<li>
				<?php esc_html_e( 'Exclusive or inclusive tax rates', 'simple-pay' ); ?>
			</li>
			<li>
				<?php esc_html_e( 'Supports on-site and Stripe Checkout forms', 'simple-pay' ); ?>
			</li>
			<li>
				<?php esc_html_e( 'Combine multiple tax rates', 'simple-pay' ); ?>
			</li>
			<li>
				<?php esc_html_e( 'Customize labels for added taxes and fees', 'simple-pay' ); ?>
			</li>
		</ul>
	</section>

	<section>
		<a href="<?php echo esc_url( $upgrade_url ); ?>" class="button button-primary button-large simpay-upgrade-btn" target="_blank" rel="noopener noreferrer">
			<?php echo esc_html( $upgrade_text ); ?>
		</a>

		<?php if ( ! empty( $upgrade_subtext ) ) : ?>
		<div class="simpay-upgrade-btn-subtext">
			<?php echo esc_html( $upgrade_subtext ); ?>
		</div>
		<?php endif; ?>
	</section>

</div>
