<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>

	<table>
		<thead>
		<tr>
			<th colspan="2"><?php esc_html_e( 'General Options', 'stripe' ); ?></th>
		</tr>
		</thead>
		<tbody class="simpay-panel-section">

		<tr class="simpay-panel-field">
			<th>
				<label for="_success_redirect_type"><?php esc_html_e( 'Confirmation Type', 'stripe' ); ?></label>
			</th>
			<td>
				<?php

				$success_redirect_type = simpay_get_saved_meta( $post->ID, '_success_redirect_type', 'default' );

				simpay_print_field( array(
					'type'        => 'radio',
					'name'        => '_success_redirect_type',
					'id'          => '_success_redirect_type',
					'class'       => array( 'simpay-multi-toggle' ),
					'options'     => array(
						'default'  => __( 'Default', 'stripe' ),
						'page'     => __( 'Page', 'stripe' ),
						'redirect' => __( 'Redirect', 'stripe' ),
					),
					'inline'      => 'inline',
					'default'     => 'default',
					'value'       => $success_redirect_type,
				) );
				?>
			</td>
		</tr>

		<tr class="simpay-panel-field toggle-_success_redirect_type-page <?php echo 'page' !== $success_redirect_type ? 'simpay-panel-hidden' : ''; ?>">
			<th>&nbsp;</th>
			<td>
				<?php

				simpay_print_field( array(
					'type'        => 'select',
					'page_select' => 'page_select',
					'name'        => '_success_redirect_page',
					'id'          => '_success_redirect_page',
					'value'       => simpay_get_saved_meta( $post->ID, '_success_redirect_page', '' ),
				) );

				?>
			</td>
		</tr>

		<tr class="simpay-panel-field toggle-_success_redirect_type-redirect <?php echo 'redirect' !== $success_redirect_type ? 'simpay-panel-hidden' : ''; ?>">
			<th>&nbsp;</th>
			<td>
				<?php

				simpay_print_field( array(
					'type'        => 'standard',
					'subtype'     => 'text',
					'name'        => '_success_redirect_url',
					'id'          => '_success_redirect_url',
					'class'       => array(),
					'value'       => simpay_get_saved_meta( $post->ID, '_success_redirect_url', '' ),
				) );

				?>
			</td>
		</tr>

		</tbody>
	</table>

