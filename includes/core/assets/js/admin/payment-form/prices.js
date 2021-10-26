/* global wp, _, jQuery, spGeneral */

/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Updates the display label as settings change.
 *
 * @param {HTMLElement} priceEl Price container element.
 */
function onChangeLabel( priceEl ) {
	const labelDisplay = priceEl.querySelector( '.simpay-price-label-display' );
	const labelInput = priceEl.querySelector( '.simpay-price-label' );

	const {
		strings: { recurringIntervalDisplay, customAmountLabel },
	} = spGeneral;

	if ( '' !== labelInput.value ) {
		labelDisplay.innerHTML = labelInput.value;
	} else {
		let label;
		const currencyInput = priceEl.querySelector( '.simpay-price-currency' );
		const amountInput = priceEl.querySelector( '.simpay-price-amount' );
		const amountTypeInput = priceEl.querySelector(
			'.simpay-price-amount-type'
		);

		const customAmountInput = priceEl.querySelector(
			'.simpay-price-custom-amount input'
		);
		const customAmountToggle = priceEl.querySelector(
			'.simpay-price-enable-custom-amount'
		);

		const {
			strings: { currencyPosition, recurringIntervals },
		} = spGeneral;
		const currencySymbol =
			currencyInput.options[ currencyInput.selectedIndex ].dataset.symbol;

		if ( true === customAmountToggle.checked ) {
			label = customAmountInput.value;
		} else {
			label = amountInput.value;
		}

		switch ( currencyPosition ) {
			case 'left':
				label = `${ currencySymbol }${ label }`;
				break;
			case 'left_space':
				label = `${ currencySymbol } ${ label }`;
				break;
			case 'right':
				label = `${ label }${ currencySymbol }`;
				break;
			case 'right_space':
				label = `${ label } ${ currencySymbol }`;
				break;
		}

		if ( true === customAmountToggle.checked ) {
			label = customAmountLabel.replace( '%s', label );
		}

		if ( 'recurring' === amountTypeInput.value ) {
			const recurringInterval = priceEl.querySelector(
				'.simpay-price-recurring-interval'
			);

			const recurringIntervalCount = priceEl.querySelector(
				'.simpay-price-recurring-interval-count'
			);

			const recurringIntervalDisplayNouns =
				recurringIntervals[
					recurringInterval.options[ recurringInterval.selectedIndex ]
						.value
				];

			let recurringIntervalDisplayReplaced = recurringIntervalDisplay;

			recurringIntervalDisplayReplaced = recurringIntervalDisplayReplaced.replace(
				'%1$s',
				label
			);

			recurringIntervalDisplayReplaced = recurringIntervalDisplayReplaced.replace(
				'%2$s',
				recurringIntervalCount.value
			);

			recurringIntervalDisplayReplaced = recurringIntervalDisplayReplaced.replace(
				'%3$s',
				recurringIntervalCount.value === '1'
					? recurringIntervalDisplayNouns[ 0 ]
					: recurringIntervalDisplayNouns[ 1 ]
			);

			label = recurringIntervalDisplayReplaced;
		}

		labelDisplay.innerHTML = label;
	}
}

/**
 * Handles changing the current price option's currency.
 *
 * @param {HTMLElement} priceEl Price container element.
 */
function onChangeCurrency( priceEl ) {
	const { options, selectedIndex } = priceEl.querySelector(
		'.simpay-price-currency'
	);
	const { symbol } = options[ selectedIndex ].dataset;

	const currenySymbolEls = priceEl.querySelectorAll(
		'.simpay-price-currency-symbol'
	);

	_.each(
		currenySymbolEls,
		( currencySymbolEl ) => ( currencySymbolEl.innerText = symbol )
	);
}

/**
 * Handles displaying the current price's relevant settings when a Price's
 * "Amount Type" changes.
 *
 * @param {HTMLElement} priceEl Price container element.
 * @param {HTMLElement} toggle Price type toggle element.
 */
function onToggleAmountType( priceEl, toggle ) {
	// Disable current toggles.
	const toggles = priceEl.querySelectorAll(
		'.simpay-price-amount-type .button'
	);

	_.each( toggles, ( toggle ) =>
		toggle.classList.remove( 'button-primary' )
	);

	// Update current toggle and show relevant settings.
	const { amountType } = toggle.dataset;

	const recurringSettings = priceEl.querySelector(
		'.simpay-price-recurring-settings'
	);

	toggle.classList.add( 'button-primary' );
	recurringSettings.style.display =
		'recurring' === amountType ? 'block' : 'none';

	// Hide "optional recur" setting.
	const canRecurSetting = priceEl.querySelector(
		'.simpay-price-recurring-amount-toggle'
	);

	const canRecurToggle = priceEl.querySelector(
		'.simpay-price-enable-optional-subscription'
	);

	canRecurSetting.style.display =
		'recurring' === amountType ? 'none' : 'block';
	canRecurToggle.checked = false;

	// Update the hidden field to track the amount type.
	priceEl.querySelector( '.simpay-price-amount-type' ).value = amountType;
}

/**
 * Handles displaying the current price's recurring settings
 * if the "Can optionally be purchased as a subscription" setting is checked.
 *
 * @param {HTMLElement} priceEl Price container element.
 * @param {HTMLElement} checkbox Recurring toggle element.
 */
function onToggleCanRecur( priceEl, checkbox ) {
	const recurringSettings = priceEl.querySelector(
		'.simpay-price-recurring-settings'
	);

	recurringSettings.style.display = checkbox.checked ? 'block' : 'none';
}

/**
 * Handles displaying the current price's custom amount settings.
 *
 * @param {HTMLElement} priceEl Price container element.
 */
function onToggleCustomAmount( priceEl ) {
	const customAmountSettings = priceEl.querySelector(
		'.simpay-price-custom-amount'
	);

	customAmountSettings.style.display =
		'none' === customAmountSettings.style.display ? 'block' : 'none';
}

/**
 * Handles validating the recurring interval. Can not be over one year.
 *
 * @param {HTMLElement} priceEl Price container element.
 */
function onChangeRecurring( priceEl ) {
	const recurringInterval = priceEl.querySelector(
		'.simpay-price-recurring-interval'
	);

	const recurringIntervalCount = priceEl.querySelector(
		'.simpay-price-recurring-interval-count'
	);

	const recurringIntervalCountValue = parseInt(
		recurringIntervalCount.value
	);

	const recurringIntervalValue =
		recurringInterval.options[ recurringInterval.selectedIndex ].value;

	// Update the recurring interval pluralization based on the count value.
	const pluralizations = JSON.parse( recurringInterval.dataset.intervals );

	[ ...recurringInterval.options ].forEach( ( { value }, i ) => {
		recurringInterval.options[ i ].text =
			recurringIntervalCountValue === 1
				? pluralizations[ value ][ 0 ]
				: pluralizations[ value ][ 1 ];
	} );

	// Limit each interval to maximum 5 years (imposed by Stripe).
	switch ( recurringIntervalValue ) {
		case 'day':
			if ( recurringIntervalCountValue > 1825 ) {
				recurringIntervalCount.value = 1825;
			}
			break;
		case 'week':
			if ( recurringIntervalCountValue > 260 ) {
				recurringIntervalCount.value = 260;
			}
			break;
		case 'month':
			if ( recurringIntervalCountValue > 60 ) {
				recurringIntervalCount.value = 60;
			}
			break;
		case 'year':
			if ( recurringIntervalCountValue > 5 ) {
				recurringIntervalCount.value = 5;
			}
			break;
	}
}

/**
 * Handles displaying the current price's legacy settings.
 *
 * @param {HTMLElement} priceEl Price container element.
 */
function onToggleLegacySettings( priceEl ) {
	const legacySettingEls = priceEl.querySelectorAll(
		'.simpay-price-legacy-setting'
	);

	_.each(
		legacySettingEls,
		( legacySettingEl ) =>
			( legacySettingEl.style.display =
				'block' === legacySettingEl.style.display ? 'none' : 'block' )
	);
}

/**
 * Handles toggling the current price option as the default selection.
 *
 * @param {HTMLElement} priceEl Price container element.
 */
function onToggleDefault( priceEl ) {
	const allDefaults = document.querySelectorAll( '.simpay-price-default' );

	_.each( allDefaults, ( defaultEl ) => ( defaultEl.checked = false ) );

	priceEl.querySelector( '.simpay-price-default' ).checked = true;
}

/**
 * Handles remove a price.
 *
 * @param {HTMLElement} priceEl Price container element.
 */
function onRemove( priceEl ) {
	priceEl.remove();
	ensureDefaultPrice();
}

/**
 * Handles adding a new price option.
 *
 * @param {HTMLElement} buttonEl "Add Price" button.
 */
function onAddPrice( buttonEl ) {
	const { nonce, formId } = buttonEl.dataset;
	const priceListEl = document.getElementById( 'simpay-prices' );

	// Disable button.
	buttonEl.classList.add( 'disabled' );

	wp.ajax.send( 'simpay_add_price', {
		data: {
			_wpnonce: nonce,
			form_id: formId,
		},
		success: ( response ) => {
			jQuery( priceListEl ).append( response );

			// Rebind events when added.
			bindPriceOptions();
			ensureDefaultPrice();

			// Reenable button.
			buttonEl.classList.remove( 'disabled' );
		},
		error: ( { message } ) => {
			alert( message );

			// Reenable button.
			buttonEl.classList.remove( 'disabled' );
		},
	} );
}

/**
 * Handles adding an existing (legacy) Stripe Plan.
 *
 * @param {HTMLElement} buttonEl "Add Plan" button.
 */
function onAddPlan( buttonEl ) {
	const { nonce, formId } = buttonEl.dataset;
	const priceListEl = document.getElementById( 'simpay-prices' );
	const planIdEl = document.getElementById(
		'simpay-prices-advanced-plan-id'
	);

	buttonEl.classList.add( 'disabled' );

	wp.ajax.send( 'simpay_add_plan', {
		data: {
			_wpnonce: nonce,
			form_id: formId,
			plan_id: planIdEl.value,
		},
		success: ( response ) => {
			jQuery( priceListEl ).append( response );

			// Rebind events when added.
			bindPriceOptions();

			// Hide advanced settings and clear input.
			document.getElementById( 'simpay-prices-advanced' ).style.display =
				'none';
			planIdEl.value = '';

			// Reenable button.
			buttonEl.classList.remove( 'disabled' );
		},
		error: ( { message } ) => {
			alert( message );

			// Reenable button.
			buttonEl.classList.remove( 'disabled' );
		},
	} );
}

/**
 * Binds jQuery sortable to price options.
 */
function bindSortablePriceOptions() {
	$( '.simpay-prices' ).sortable( {
		items: '.simpay-field-metabox',
		containment: '#simpay-prices',
		handle: '.simpay-hndle',
		placeholder: 'sortable-placeholder',
		cursor: 'move',
		delay: $( document.body ).hasClass( 'mobile' ) ? 200 : 0,
		distance: 2,
		tolerance: 'pointer',
		forcePlaceholderSize: true,
		opacity: 0.65,

		// @link https://core.trac.wordpress.org/changeset/35809
		helper( event, element ) {
			/* `helper: 'clone'` is equivalent to `return element.clone();`
			 * Cloning a checked radio and then inserting that clone next to the original
			 * radio unchecks the original radio (since only one of the two can be checked).
			 * We get around this by renaming the helper's inputs' name attributes so that,
			 * when the helper is inserted into the DOM for the sortable, no radios are
			 * duplicated, and no original radio gets unchecked.
			 */
			return element
				.clone()
				.find( ':input' )
				.attr( 'name', function ( i, currentName ) {
					return (
						'sort_' +
						parseInt( Math.random() * 100000, 10 ).toString() +
						'_' +
						currentName
					);
				} )
				.end();
		},
	} );
}

/**
 * Binds events to various elements on each price option.
 */
function bindPriceOptions() {
	const pricesEls = document.querySelectorAll( '.simpay-price' );

	_.each( pricesEls, ( priceEl ) => {
		const amountType = priceEl.querySelector( '.simpay-price-amount-type' )
			.value;

		// Label.
		const labelInput = priceEl.querySelector( '.simpay-price-label' );

		labelInput.addEventListener( 'keyup', () => onChangeLabel( priceEl ) );
		onChangeLabel( priceEl );

		// Currency symbol.
		const currencyToggle = priceEl.querySelector(
			'.simpay-price-currency'
		);

		currencyToggle.addEventListener( 'change', () => {
			onChangeCurrency( priceEl );
			onChangeLabel( priceEl );
		} );

		// Amount type toggle.
		const amountTypeToggles = priceEl.querySelectorAll(
			'.simpay-price-amount-type .button'
		);

		if ( amountTypeToggles.length > 0 ) {
			_.each( amountTypeToggles, ( amountTypeToggle ) =>
				amountTypeToggle.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					onToggleAmountType( priceEl, e.target );
					onChangeLabel( priceEl );
				} )
			);
		}

		// Amount.
		const amountInput = priceEl.querySelector( '.simpay-price-amount' );

		amountInput.addEventListener( 'keyup', () => onChangeLabel( priceEl ) );

		// Optional recurring toggle.
		const canRecurToggle = priceEl.querySelector(
			'.simpay-price-enable-optional-subscription'
		);

		if ( canRecurToggle ) {
			canRecurToggle.addEventListener( 'click', ( { target } ) => {
				onToggleCanRecur( priceEl, target );
				onChangeLabel( priceEl );
			} );

			if ( 'recurring' !== amountType ) {
				onToggleCanRecur( priceEl, canRecurToggle );
			}
		}

		// Custom amount toggle.
		const customAmountToggle = priceEl.querySelector(
			'.simpay-price-enable-custom-amount'
		);

		customAmountToggle.addEventListener( 'click', () => {
			onToggleCustomAmount( priceEl );
			onChangeLabel( priceEl );
		} );

		// Recurring interval.
		const recurringInterval = priceEl.querySelector(
			'.simpay-price-recurring-interval'
		);

		recurringInterval.addEventListener( 'change', () => {
			onChangeLabel( priceEl );
			onChangeRecurring( priceEl );
		} );

		// Recurring interval count.
		const recurringIntervalCount = priceEl.querySelector(
			'.simpay-price-recurring-interval-count'
		);

		recurringIntervalCount.addEventListener( 'keyup', () => {
			onChangeRecurring( priceEl );
			onChangeLabel( priceEl );
		} );
		recurringIntervalCount.addEventListener( 'change', () => {
			onChangeRecurring( priceEl );
			onChangeLabel( priceEl );
		} );

		// Legacy settings toggle.
		const legacySettingsToggle = priceEl.querySelector(
			'.simpay-price-legacy-setting-toggle'
		);

		if ( legacySettingsToggle ) {
			legacySettingsToggle.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				onToggleLegacySettings( priceEl );
			} );
		}

		// Default checkbox.
		const defaultToggle = priceEl.querySelector( '.simpay-price-default' );

		defaultToggle.addEventListener( 'change', () =>
			onToggleDefault( priceEl )
		);

		// Remove.
		const removeToggle = priceEl.querySelector( '.simpay-price-remove' );

		removeToggle.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			onRemove( priceEl );
		} );
	} );
}

/**
 * Binds events to "Advanced" options.
 */
function bindAdvancedOptions() {
	const toggleAdvancedEl = document.getElementById(
		'simpay-prices-advanced-toggle'
	);

	const advancedEl = document.getElementById( 'simpay-prices-advanced' );

	if ( ! toggleAdvancedEl || ! advancedEl ) {
		return;
	}

	toggleAdvancedEl.addEventListener( 'click', function ( e ) {
		e.preventDefault();

		advancedEl.style.display =
			'block' == advancedEl.style.display ? 'none' : 'block';
	} );
}

/**
 * Binds events for adding a new Price.
 */
function addPrice() {
	const addButtonEl = document.getElementById( 'simpay-add-price' );

	if ( ! addButtonEl ) {
		return;
	}

	addButtonEl.addEventListener( 'click', ( e ) => {
		e.preventDefault();
		onAddPrice( addButtonEl );
	} );
}

/**
 * Binds events for adding an existing (legacy) Stripe Plan.
 */
function addPlan() {
	const addButtonEl = document.getElementById( 'simpay-prices-advanced-add' );

	if ( ! addButtonEl ) {
		return;
	}

	addButtonEl.addEventListener( 'click', ( e ) => {
		e.preventDefault();
		onAddPlan( addButtonEl );
	} );
}

/**
 * Shows or hides "Remove" toggles based on the current amount of prices.
 */
function ensureDefaultPrice() {
	const prices = document.querySelectorAll( '.simpay-price' );

	if ( ! document.querySelector( '.simpay-price-default:checked' ) ) {
		prices[ 0 ].querySelector( '.simpay-price-default' ).checked = true;
	}
}

/**
 * DOM ready.
 */
domReady( () => {
	bindSortablePriceOptions();
	bindPriceOptions();
	bindAdvancedOptions();
	addPlan();
	addPrice();
} );
