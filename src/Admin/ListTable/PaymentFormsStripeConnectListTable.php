<?php
/**
 * List Table: Payment forms Stripe Connect
 *
 * @package SimplePay
 * @subpackage Core
 * @copyright Copyright (c) 2021, WP Simple Pay, LLC
 * @license http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since 4.4.0
 */

namespace SimplePay\Core\Admin\ListTable;

use WP_Posts_List_Table;

if ( ! class_exists( 'WP_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

if ( ! class_exists( 'WP_Posts_List_Table' ) ) {
	require_once ABSPATH . 'wp-admin/includes/class-wp-posts-list-table.php';
}

/**
 * PaymentFormsStripeConnectListTable class.
 *
 * @since 4.4.0
 */
class PaymentFormsStripeConnectListTable extends WP_Posts_List_Table {

	/**
	 * {@inheritdoc}
	 *
	 * @return void
	 */
	public function display() {
		// @todo use a ViewLoader
		include_once SIMPLE_PAY_DIR . '/views/admin-payment-forms-stripe-connect.php'; // @phpstan-ignore-line
	}

}
