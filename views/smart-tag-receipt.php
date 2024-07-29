<?php
/**
 * View: Smart Tag - {receipt}
 *
 * @package SimplePay\Core\Payments\Payment_Confirmation\Template_Tags
 * @copyright Copyright (c) 2024, Sandhills Development, LLC
 * @license http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since 4.11.0
 *
 * @var SimplePay\Core\Abstracts\Form $form
 * @var string $currency
 * @var array{array{description: string, quantity: int, unit_amount: int, amount: int}} $line_items
 * @var int $subtotal
 * @var int $discount
 * @var int $fee_recovery
 * @var int $tax
 * @var int $total
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>

<div class="simpay-receipt">
	<table>
		<thead>
			<tr>
				<th>
					<?php esc_html_e( 'Description', 'stripe' ); ?>
				</th>
				<th class="text-center">
					<?php esc_html_e( 'Quantity', 'stripe' ); ?>
				</th>
				<th class="text-center">
					<?php esc_html_e( 'Unit Price', 'stripe' ); ?>
				</th>
				<th class="text-right">
					<?php esc_html_e( 'Amount', 'stripe' ); ?>
				</th>
			</tr>
		</thead>
		<tbody>
			<?php foreach ( $line_items as $line_item ) : ?>
			<tr>
				<td>
					<?php echo esc_html( $line_item['description'] ); ?>
				</td>
				<td class="text-center">
					<?php echo esc_html( (string) $line_item['quantity'] ); ?>
				</td>
				<td class="text-center">
					<?php
					echo esc_html(
						simpay_format_currency(
							$line_item['unit_amount'],
							$currency
						)
					);
					?>
				</td>
				<td class="text-right">
					<?php
					echo esc_html(
						simpay_format_currency(
							$line_item['amount'],
							$currency
						)
					);
					?>
				</td>
			</tr>
			<?php endforeach; ?>
		</tbody>
		<tfoot>
			<?php
			if ( $subtotal !== $total ) :
				$fields = $form->custom_fields;

				$total_amount_field = array_filter(
					$fields,
					function ( $field ) {
						return 'total_amount' === $field['type'];
					}
				);

				if ( ! empty( $total_amount_field ) ) {
					$total_amount_field = reset( $total_amount_field );
					$label              = $total_amount_field['subtotal_label'];
				} else {
					$label = __( 'Subtotal', 'stripe' );
				}
				?>
			<tr>
				<td colspan="3" class="text-right">
					<?php echo esc_html( $label ); ?>
				</td>
				<td class="text-right">
					<?php
					echo esc_html(
						simpay_format_currency( $subtotal, $currency )
					);
					?>
				</td>
			</tr>
			<?php endif; ?>

			<?php if ( $discount > 0 ) : ?>
			<tr class="text-right">
				<td colspan="3" class="text-right">
					<?php esc_html_e( 'Discount', 'stripe' ); ?>
				</td>
				<td class="text-right">
					&ndash;
					<?php
					echo esc_html(
						simpay_format_currency( $discount, $currency )
					);
					?>
				</td>
			</tr>
			<?php endif; ?>

			<?php
			if ( $form->has_fee_recovery() ) :
				$fields = $form->custom_fields;

				$total_amount_field = array_filter(
					$fields,
					function ( $field ) {
						return 'total_amount' === $field['type'];
					}
				);

				if ( ! empty( $total_amount_field ) ) {
					$total_amount_field = reset( $total_amount_field );
					$label              = $total_amount_field['fee_recovery_label'];
				} else {
					$label = __( 'Processing fee', 'stripe' );
				}
				?>
			<tr>
				<td colspan="3" class="text-right">
					<?php echo esc_html( $label ); ?>
				</td>
				<td class="text-right">
					<?php
					echo esc_html(
						simpay_format_currency( $fee_recovery, $currency )
					);
					?>
				</td>
			</tr>
			<?php endif; ?>

			<?php if ( $tax > 0 ) : ?>
			<tr class="text-right">
				<td colspan="3" class="text-right">
					<?php esc_html_e( 'Tax', 'stripe' ); ?>
				</td>
				<td class="text-right">
					<?php
					echo esc_html(
						simpay_format_currency( $tax, $currency )
					);
					?>
				</td>
			</tr>
			<?php endif; ?>

			<tr class="total-row">
				<td colspan="3" class="text-right">
					<?php
					$fields = $form->custom_fields;

					$total_amount_field = array_filter(
						$fields,
						function ( $field ) {
							return 'total_amount' === $field['type'];
						}
					);

					if ( ! empty( $total_amount_field ) ) {
						$total_amount_field = reset( $total_amount_field );
						$label              = $total_amount_field['label'];
					} else {
						$label = __( 'Total', 'stripe' );
					}

					echo esc_html( $label );
					?>
				</td>
				<td class="text-right">
					<?php
					echo esc_html(
						simpay_format_currency( $total, $currency )
					);
					?>
				</td>
			</tr>
		</tfoot>
	</table>
</div>
