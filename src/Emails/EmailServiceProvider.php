<?php
/**
 * Emails: Service provider
 *
 * @package SimplePay
 * @subpackage Core
 * @copyright Copyright (c) 2023, Sandhills Development, LLC
 * @license http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since 4.7.3
 */

namespace SimplePay\Core\Emails;

use SimplePay\Core\AbstractPluginServiceProvider;

/**
 * EmailServiceProvider class.
 *
 * @since 4.7.3
 */
class EmailServiceProvider extends AbstractPluginServiceProvider {

	/**
	 * {@inheritdoc}
	 */
	public function get_services() {
		return array(
			'mailer',
			'email-invoice-confirmation',
			'email-payment-confirmation',
			'email-payment-notification',
			'email-upcoming-invoice',
			'email-summary-report',
			'email-manage-subscriptions',
		);
	}

	/**
	 * {@inheritdoc}
	 */
	public function get_subscribers() {
		return array(
			'email-subscriber',
			'email-summary-report-scheduler',
		);
	}

	/**
	 * {@inheritdoc}
	 */
	public function register() {
		$container = $this->getContainer();

		// Mailer.
		$container->add( 'mailer', Mailer::class );

		// Emails.
		$container->add(
			'email-invoice-confirmation',
			Email\InvoiceConfirmationEmail::class
		);

		$container->add(
			'email-payment-confirmation',
			Email\PaymentConfirmationEmail::class
		);

		$container->add(
			'email-payment-notification',
			Email\PaymentNotificationEmail::class
		);

		$container->add(
			'email-upcoming-invoice',
			Email\UpcomingInvoiceEmail::class
		);

		$container->add(
			'email-summary-report',
			Email\SummaryReportEmail::class
		);

		$container->add(
			'email-manage-subscriptions',
			Email\ManageSubscriptionsEmail::class
		);

		// Summary report scheduler.
		$container->add(
			'email-summary-report-scheduler',
			SummaryReportEmailScheduler::class
		)
			->withArguments(
				array(
					$container->get( 'scheduler' ),
					$container->get( 'email-summary-report' ),
				)
			);

		// Email subscriber.
		$container->share( 'email-subscriber', EmailSubscriber::class )
			->withArgument(
				array(
					'invoice-confirmation' => $container->get( 'email-invoice-confirmation' ),
					'payment-confirmation' => $container->get( 'email-payment-confirmation' ),
					'payment-notification' => $container->get( 'email-payment-notification' ),
					'upcoming-invoice'     => $container->get( 'email-upcoming-invoice' ),
					'summary-report'       => $container->get( 'email-summary-report' ),
					'manage-subscriptions' => $container->get( 'email-manage-subscriptions' ),
				)
			);
	}
}
